type objType = {
    [key: string]: string  | null | FileList
}

export function objToFormData(obj : objType): FormData {
    const formData = new FormData();
    Object.entries(obj).forEach(([key, value]) => {
        if(key==="imgs" && value) {
            let i = 0;
            Array.from(value as FileList).map(item => {
                formData.append(key, value[i] as string | Blob);
                i++;
            });
        } else {
            formData.append(key, value as string);
        }
    });

    return formData;
}