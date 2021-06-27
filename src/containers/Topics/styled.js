Http.get(url, { responseType: 'blob' })
                .then((response) => {
                    const reader = new window.FileReader();
                    reader.readAsDataURL(response.data);
                    reader.onload = function () {
                        const imageDataUrl = reader.result;
                        resolve(imageDataUrl);
                    };
                })
                .catch((err) => {
                    reject(err);
                });