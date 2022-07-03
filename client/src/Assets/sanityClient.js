import client from '@sanity/client';


export default client({
    projectId: "dw4jvvdm",
    dataset: "classline_production",
    apiVersion: '2022-06-18',
    useCdn: true,
})