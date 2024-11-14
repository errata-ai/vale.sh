export function clean(code: string) {
    var spaced = code.replaceAll(/=/g, ' = ').replaceAll(/,/g, ', ');
    var s1 = spaced.replace('StylesPath = styles', 'StylesPath = styles\n');
    return s1.replace('Packages', '\nPackages');
}

export function isAlpha(str: string) {
    return /^[a-zA-Z0-9]+$/.test(str);
}
