export type BookCardProps = {
    book: Book,
    username: string
}

export type Book = {
    id: string,
    volumeInfo: VolumeInfo,
    saleInfo: SaleInfo
}

type VolumeInfo = {
    imageLinks: ImageLinks,
    title: string,
    categories: [string],
    authors: [string],
    publishedDate: string,
    pageCount: number,
    previewLink: string,
}

type ImageLinks = {
    thumbnail: string
}

type SaleInfo = {
    buyLink: string
}