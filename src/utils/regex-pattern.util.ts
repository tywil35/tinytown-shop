/* eslint-disable no-useless-escape */
export const RegexTest: Record<RegexPattern, (test: string) => boolean> = {
    ANYTHING: (test: string): boolean => { return /[\s\S]+/.test(test) },
    ALPHANUMERIC_NO_SPACE: (test: string): boolean => { return /^[a-zA-Z0-9]+$/.test(test) },
    ALPHANUMERIC_SPACE: (test: string): boolean => { return /^[a-zA-Z0-9\s]+$/.test(test) },
    COMMON_EMAIL_ID: (test: string): boolean => { return /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/.test(test) },
    COMPLEX_PASSSWORD: (test: string): boolean => { return /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/.test(test) },
    DECIMAL_NUMBER: (test: string): boolean => { return /^\d*\.\d+$/.test(test) },
    FILE_PATH_FILNAME_EXT: (test: string): boolean => { return /((\/|\\|\/\/|https?:\\\\|https?:\/\/)[a-z0-9 _@\-^!#$%&+={}.\/\\\[\]]+)+\.[a-zA-Z0-9]+$/.test(test) },
    FILENAME_EXT: (test: string): boolean => { return /^[\w,\s-]+\.[a-zA-Z0-9]+$/.test(test) },
    HTML: (test: string): boolean => { return /<\/?[\w\s]*>|<.+[\W]>/.test(test) },
    MODERATE_PASSWORD: (test: string): boolean => { return /(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/.test(test) },
    SLUG: (test: string): boolean => { return /^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/.test(test) },
    UNCOMMON_EMAIL_ID: (test: string): boolean => { return /^([a-z0-9_\.\+-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(test) },
    URL: (test: string): boolean => { return  /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/.test(test) },
    USERNAME: (test: string): boolean => { return /^[a-z0-9_-]{3,16}$/.test(test) },
    WHOLE_NUMBER: (test: string): boolean => { return /^\d+$/.test(test) },
    DIRTY_CELL: (test: string): boolean => { return /^\+|^\d+$/.test(test) },
};

export enum RegexPattern {
    ANYTHING = 'ANYTHING',
    ALPHANUMERIC_NO_SPACE = 'ALPHANUMERIC_NO_SPACE',
    ALPHANUMERIC_SPACE = 'ALPHANUMERIC_SPACE',
    COMMON_EMAIL_ID = 'COMMON_EMAIL_ID',
    COMPLEX_PASSSWORD = 'COMPLEX_PASSSWORD',
    DECIMAL_NUMBER = 'DECIMAL_NUMBER',
    FILE_PATH_FILNAME_EXT = 'FILE_PATH_FILNAME_EXT',
    FILENAME_EXT = 'FILENAME_EXT',
    HTML = 'HTML',
    MODERATE_PASSWORD = 'MODERATE_PASSWORD',
    SLUG = 'SLUG',
    UNCOMMON_EMAIL_ID = 'UNCOMMON_EMAIL_ID',
    URL = 'URL',
    USERNAME = 'USERNAME',
    WHOLE_NUMBER = 'WHOLE_NUMBER',
    DIRTY_CELL = 'DIRTY_CELL',
}

