import React, { useState } from 'react'
import { MainLayoutDg } from '../../layouts/MainLayoutDg'
import { FormContainer } from '../../components/ui/FormContainer'

export const PruebasXml = () => {
    const [xmlData, setXmlData] = useState(null);

    const handleFile = async (e) => {
        const file = e.target.files[0];

        const text = await file.text();

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, "application/xml");

        const items = xmlDoc.getElementsByTagName('item');

        const parsedItems = [];

        for (let i = 0; i < items.length; i++) {
            parsedItems.push({
                name: items[i].getElementsByTagName('name')[0].textContent,
                description: items[i].getElementsByTagName('description')[0].textContent
            });
        }

        setXmlData(parsedItems);
    };

    return (
        <MainLayoutDg>
            <FormContainer>
                <div>
                    <input type="file" onChange={handleFile} />

                    {/* {xmlData && xmlData.map(...)} */}

                </div>
            </FormContainer>
        </MainLayoutDg>
    )
}
