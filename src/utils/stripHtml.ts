// gets rid off the HTML tags coming with the book description from the Google Books API
export function stripHtml(htmlString: string) {
    return htmlString.replace(/<[^>]*>/g, '');
}
  