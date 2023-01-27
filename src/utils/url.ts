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

export function setParamsUrl(url: string, name: string, value: string): void {
    const urlNew = new URL(url);
    urlNew.searchParams.append(name, encodeURIComponent(value));
    history.pushState('', '', urlNew);
    window.dispatchEvent(new Event('pushstate'));
}

export function deleteParamsUrl(url: string, name: string, value: string): void {
    const urlNew = new URL(url);
    const params = urlNew.searchParams.getAll(name).filter((element) => element !== encodeURIComponent(value));
    urlNew.searchParams.delete(name);
    params.forEach((element) => urlNew.searchParams.append(name, element));
    history.pushState('', '', urlNew);
    window.dispatchEvent(new Event('pushstate'));
}

export function getAllParams(url: string, name: string): string[] | null {
    const urlNew = new URL(url);
    return urlNew.searchParams.getAll(name).map((element) => decodeURIComponent(element));
}

export function changePagesUrl(url: string, name: string, value?: string): void {
    const urlNew = new URL(url);
    value ? (urlNew.pathname = name + '/' + value) : (urlNew.pathname = name);

    history.pushState('', '', urlNew);
    window.dispatchEvent(new Event('pushstate'));
}
