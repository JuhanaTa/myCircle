export const helloFunction = async () => {

    const body = {};
    console.log('Running firebase function');
    const response = await fetch(
        'https://us-central1-mycircle-ca851.cloudfunctions.net/helloWorld', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        }
    );
    return response;
};
