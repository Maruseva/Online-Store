export function changeUrl(url: string, name: string, value: string): void {
    const urlNew = new URL(url);
    urlNew.searchParams.set(name, value);
    history.pushState('', '', urlNew);
    window.dispatchEvent(new Event('pushstate'));
}

export function getUrlValue(url: string, name: string): string | null {
    const urlNew = new URL(url);
    return urlNew.searchParams.get(name);
}
