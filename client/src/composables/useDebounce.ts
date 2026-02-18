export const useDebounce = (func: () => void, debounceDelay: number) => {
    let debounceTimeout: NodeJS.Timeout | null = null
    const DEBOUNCE_DELAY = debounceDelay

    const debounceFunc = () => {
        if (debounceTimeout) {
            clearTimeout(debounceTimeout)
        }

        debounceTimeout = setTimeout(() => {
            func()
        }, DEBOUNCE_DELAY)
    }

    const cleanup = () => {
        if (debounceTimeout) {
            clearTimeout(debounceTimeout)
            debounceTimeout = null
        }
    }

    return { debounceFunc, cleanup }
}
