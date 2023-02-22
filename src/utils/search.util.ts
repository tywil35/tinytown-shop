import type { SearchMode } from "@/components/table/interfaces/search-mode.type";

export const SearchNumber = (term: number, compared: number, mode: SearchMode): boolean => {
    switch (mode) {
        case 'bigger':
            return term <= compared;
        case 'smaller':
            return term >= compared;
        case 'match':
            return term === compared;
        default:
            return false;
    }
}
export const WildSearch = (term: string, compared: string): boolean => {
    const tl = term.toLowerCase();
    const cl = compared.toLowerCase();
    return cl.search(tl) >= 0;
}
export const MatchSearch = (term: string, compared: string): boolean => {
    return term.toLowerCase() === compared.toLowerCase();
}