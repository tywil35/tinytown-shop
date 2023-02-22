<script setup lang="ts">
import { ref, computed } from 'vue';
import {
    RegexTest,
    RegexPattern
} from '@/utils/regex-pattern.util';
import IconListOL from './icons/IconListOL.vue';
import IconListUL from './icons/IconListUL.vue';
import IconBold from './icons/IconBold.vue';
import IconItalic from './icons/IconItalic.vue';
import IconHeading from './icons/IconHeading.vue';
import { marked } from 'marked';
import IconEye from './icons/IconEye.vue';
import IconLeftQuote from './icons/IconLeftQuote.vue';
import IconLink from './icons/IconLink.vue';
import IconImage from './icons/IconImage.vue';
const emit = defineEmits<{
    (e: 'update:valued', valued: string): void
}>()
const prop = defineProps<{
    named: string,
    require?: boolean,
    typed?: string,
    validation?: RegexPattern,
    validationMessage?: string,
    valued: string,
}>();

const invalid = ref<boolean>(prop.require ?? false);
const invalidCheck = () => {
    if (!prop.require) {
        invalid.value = false;
        return;
    }
    if (prop.valued === '' && !prop.validation) {
        invalid.value = true;
        return;
    }
    if (prop.valued !== '' && !prop.validation) {
        invalid.value = false;
        return;
    }
    if (prop.validation) {
        invalid.value = !RegexTest[prop.validation](prop.valued);
        return;
    }
};

const inputCSS = computed(() => {
    const input_css = ['common']
    if (!prop.require) {
        return input_css;
    }
    input_css.push(invalid.value === true ? 'invalid' : 'valid');
    return input_css;
});

const inputType = computed(() => {
    if (prop.typed) {
        return prop.typed;
    }
    return 'text';
});
const val = computed({
    get: () => prop.valued,
    set: (v) => {
        emit('update:valued', v);
    }
});

const textareaRef = ref<HTMLTextAreaElement | undefined>(undefined);

const wrapSelectionWith = (tag: string) => {
    if (!textareaRef.value) return;
    const _selectedText = selectedText();
    if (!_selectedText) { return; }
    const wrappedSelection = `${tag}${_selectedText.sel}${tag}`
    val.value = `${_selectedText.text.substring(0, _selectedText.start)}${wrappedSelection}${_selectedText.text.substring(_selectedText.end, _selectedText.text.length)}`;
    delayMoveCursor(_selectedText.start + wrappedSelection.length - (_selectedText.sel.length !== 0 ? 0 : tag.length));
}

const startSelectionWith = (tag: string) => {
    const _selectedText = selectedText();
    if (!_selectedText) { return; }
    const wrappedSelection = `${_selectedText.endline}${tag} ${_selectedText.sel}`
    val.value = `${_selectedText.text.substring(0, _selectedText.start)}${wrappedSelection}${_selectedText.text.substring(_selectedText.end, _selectedText.text.length)}`;
    delayMoveCursor(_selectedText.end + wrappedSelection.length);
}

const selectedText = (): {
    start: number,
    end: number,
    text: string,
    sel: string,
    endline: string,
} | undefined => {
    if (!textareaRef.value) return;
    const start = textareaRef.value.selectionStart;
    const end = textareaRef.value.selectionEnd;
    const text = textareaRef.value.value;
    const sel = text.substring(start, end);
    const endline = start === 0 ? '' : '\n';
    return {
        start,
        end,
        text,
        sel,
        endline,
    }
};

const delayMoveCursor = (pos: number): void => {
    textareaRef.value?.focus();
    setTimeout(() => {
        textareaRef.value?.setSelectionRange(pos, pos);
        isFocused.value = true;
    }, 300)
}

const delaySelectCursor = (pos: number[]): void => {
    textareaRef.value?.focus();
    setTimeout(() => {
        textareaRef.value?.setSelectionRange(pos[0], pos[1]);
        isFocused.value = true;
    }, 300)
}

const insertImageLink = () => {
    const _selectedText = selectedText();
    if (!_selectedText) { return; }
    let IMAGE_TEMPLATE = '![LABEL](URL_TO_IMAGE "ALT_TEXT")';
    if (_selectedText.sel !== '') {
        const isURL = RegexTest[RegexPattern.URL](_selectedText.sel)
        IMAGE_TEMPLATE = IMAGE_TEMPLATE.replace(isURL === true ? 'URL_TO_IMAGE' : 'LABEL', _selectedText.sel);
        const fromAndTo = isURL === true
            ? [_selectedText.start + IMAGE_TEMPLATE.indexOf('[') + 1, IMAGE_TEMPLATE.indexOf(']')]
            : [_selectedText.start + IMAGE_TEMPLATE.indexOf('(') + 1, IMAGE_TEMPLATE.indexOf('"ALT_TEXT")')];
        val.value = `${_selectedText.text.substring(0, _selectedText.start)}${IMAGE_TEMPLATE}${_selectedText.text.substring(_selectedText.end, _selectedText.text.length)}`;
        delaySelectCursor(fromAndTo);
    } else {
        val.value = `${_selectedText.text.substring(0, _selectedText.start)}${IMAGE_TEMPLATE}${_selectedText.text.substring(_selectedText.end, _selectedText.text.length)}`;
        delaySelectCursor([_selectedText.start + IMAGE_TEMPLATE.indexOf('[') + 1, _selectedText.end + IMAGE_TEMPLATE.indexOf(']')]);
    }
}

const insertLink = () => {
    const _selectedText = selectedText();
    if (!_selectedText) { return; }
    let LINK_TEMPLATE = '[LABEL](URL_LINK)';
    if (_selectedText.sel === '') {
        val.value = `${_selectedText.text.substring(0, _selectedText.start)}${LINK_TEMPLATE}${_selectedText.text.substring(_selectedText.end, _selectedText.text.length)}`;
        delaySelectCursor([_selectedText.start + LINK_TEMPLATE.indexOf('[') + 1, _selectedText.end + LINK_TEMPLATE.indexOf(']')]);
        return;
    }
    const isURL = RegexTest[RegexPattern.URL](_selectedText.sel)
    LINK_TEMPLATE = LINK_TEMPLATE.replace(isURL === true ? 'URL_LINK' : 'LABEL', _selectedText.sel);
    const fromAndTo = isURL === true
        ? [_selectedText.start + LINK_TEMPLATE.indexOf('[') + 1, LINK_TEMPLATE.indexOf(']')]
        : [_selectedText.start + LINK_TEMPLATE.indexOf('(') + 1, LINK_TEMPLATE.indexOf(')')];
    val.value = `${_selectedText.text.substring(0, _selectedText.start)}${LINK_TEMPLATE}${_selectedText.text.substring(_selectedText.end, _selectedText.text.length)}`;
    delaySelectCursor(fromAndTo);
}

const insertList = (tag?: string) => {
    const _selectedText = selectedText();
    if (!_selectedText) { return; }
    const orderedTag = (i: number): string => {
        return tag !== undefined ? tag : `${i + 1}.`
    };
    if (_selectedText.sel === '') {
        const wrappedSelection = `${_selectedText.endline}${orderedTag(0)} ${_selectedText.sel}`
        val.value = `${_selectedText.text.substring(0, _selectedText.start)}${wrappedSelection}${_selectedText.text.substring(_selectedText.end, _selectedText.text.length)}`;
        delayMoveCursor(_selectedText.end + wrappedSelection.length);
        return;
    }
    let splitted = _selectedText.sel.split('\n');
    splitted = splitted.filter(empty => empty !== '');
    let insertThis = _selectedText.endline;

    for (let index = 0; index < splitted.length; index++) {
        const split = splitted[index];
        if (index !== splitted.length) {
            insertThis += `${orderedTag(index)} ${split}\n`;
            continue;
        }
        insertThis += `${orderedTag(index)} ${split}`
    }
    val.value = `${_selectedText.text.substring(0, _selectedText.start)}${insertThis}${_selectedText.text.substring(_selectedText.end, _selectedText.text.length)}`;
    delayMoveCursor(_selectedText.end + insertThis.length);
}

const isFocused = ref<boolean>(false);
const previewShow = ref<boolean>(false);
const previewRef = ref<HTMLElement | undefined>(undefined);
const previewToggle = () => {
    previewShow.value = !previewShow.value;
    setTimeout(() => {
        if (!previewRef.value) {
            delayMoveCursor(val.value.length);
            return
        }
        previewRef.value.innerHTML = marked.parse(prop.valued);
    }, 300);
}
const delayBlur = () => {
    setTimeout(() => isFocused.value = false, 300)
}
</script>

<template>
    <div class="relative">
        <textarea v-if="previewShow === false" ref="textareaRef" :name="prop.named" :type="inputType" placeholder=" "
            v-model="val" @change="invalidCheck" :required="prop.require ?? false" :class="inputCSS"
            @focus="isFocused = true" @blur="delayBlur"></textarea>
        <div v-if="previewShow === true" ref="previewRef" :class="[...inputCSS, 'markdown-body']"></div>
        <div v-if="isFocused === true || previewShow === true"
            class="absolute -top-4 right-1 bg-gray-300 text-gray-500 text-center px-1 rounded grid grid-flow-col place-items-center gap-1 divide-x divide-gray-500"
            ref="textareaToolbar" role="toolbar">
            <div class="p-1" @click="previewToggle">
                <IconEye class="h-4 w-4 cursor-pointer hover:text-gray-400" />
            </div>
            <div v-if="previewShow === false" class="p-1" @click="startSelectionWith('>')">
                <IconLeftQuote class="h-4 w-4 cursor-pointer hover:text-gray-400" />
            </div>
            <div v-if="previewShow === false" class="p-1" @click="startSelectionWith('#')">
                <IconHeading class="h-4 w-4 cursor-pointer hover:text-gray-400" />
            </div>
            <div v-if="previewShow === false" class="p-1" @click="wrapSelectionWith('*')">
                <IconItalic class="h-4 w-4 cursor-pointer hover:text-gray-400" />
            </div>
            <div v-if="previewShow === false" class="p-1" @click="wrapSelectionWith('**')">
                <IconBold class="h-4 w-4 cursor-pointer hover:text-gray-400" />
            </div>
            <div v-if="previewShow === false" class="p-1" @click="insertList('-')">
                <IconListUL class="h-4 w-4 cursor-pointer hover:text-gray-400" />
            </div>
            <div v-if="previewShow === false" class="p-1" @click="insertList()">
                <IconListOL class="h-4 w-4 cursor-pointer hover:text-gray-400" />
            </div>
            <div v-if="previewShow === false" class="p-1" @click="insertLink">
                <IconLink class="h-4 w-4 cursor-pointer hover:text-gray-400" />
            </div>
            <div v-if="previewShow === false" class="p-1" @click="insertImageLink">
                <IconImage class="h-4 w-4 cursor-pointer hover:text-gray-400" />
            </div>
        </div>
        <label v-if="previewShow === false" :for="prop.named" class="-z-1 textarea-label">{{ prop.named
        }}</label>
        <label v-if="invalid && previewShow === false" :for="prop.named" class="text-red-600 text-xs">{{
                prop.validationMessage
        }}</label>
    </div>
</template>

<style>
@import '../assets/input-text-area.css';
@import '../assets/markdown.css';
</style>