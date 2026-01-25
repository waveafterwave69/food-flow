export const convertToEmbedUrl = (url: string | undefined): string => {
    if (!url) {return ''}

    if (url.includes('youtube.com/embed/')) {
        return url
    }

    const regExp =
        /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)

    if (match && match[2].length === 11) {
        return `https://www.youtube.com/embed/${match[2]}`
    }

    return url
}
