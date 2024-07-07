export const createCard=(imageSrc, cardText, country, source)=> {
    const colDiv = document.createElement('div');
    colDiv.classList.add('col-md-4', 'col-sm-6', 'mb-5');
  
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card', 'm-auto', 'h-100');
  
    const img = document.createElement('img');
    img.classList.add('card-img-top');
    img.src = imageSrc;
    img.alt = 'Card image cap';
  
    const cardBodyDiv = document.createElement('div');
    cardBodyDiv.classList.add('card-body');
  
    const p = document.createElement('h5');
    p.classList.add('text-center', 'cultureHeader');
    p.textContent = cardText;
  
    const countryCard = document.createElement('p');
    countryCard.classList.add('text-center', 'newsInfo');
    countryCard.textContent = country;
  
    const sourceCard = document.createElement('p');
    sourceCard.classList.add('text-center', 'newsInfo');
    sourceCard.textContent = source;
  
    cardBodyDiv.appendChild(p);
    cardBodyDiv.appendChild(countryCard);
    cardBodyDiv.appendChild(sourceCard);
    cardDiv.appendChild(img);
    cardDiv.appendChild(cardBodyDiv);
    colDiv.appendChild(cardDiv);
    return colDiv;
  }
  
  export const performSearch = ()=> {
    const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
    const rezultatDiv = document.getElementById('rezultat');
    if (searchTerm && rezultatDiv) {
      fetch(`https://api.europeana.eu/record/v2/search.json?wskey=thfiantib&query=${searchTerm}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok.');
          }
          return response.json();
        })
        .then(data => {
          rezultatDiv.innerHTML = '';
          const maxElem = document.createElement('h1');
          maxElem.classList.add('artHeader');
          maxElem.textContent = `Total results: ${data.totalResults}`;
          maxElem.classList.add('artHeader', 'my-5');
          rezultatDiv.appendChild(maxElem);
          const rowDiv = document.createElement('div');
          rowDiv.classList.add('row', 'justify-content-center');
          data.items.forEach(item => {
            const opis = document.createElement('h1');
            opis.classList.add('apiOpis', 'card-text', 'text-md-sm');
            opis.textContent = item.title[0];
            const country = document.createElement('p');
            country.textContent = item.country[0];
            const source = document.createElement('p');
            source.textContent = item.dataProvider[0];
            const card = createCard(item.edmPreview[0] || 'slika1.jpg', opis.textContent, 'Country: ' + country.textContent, 'Source: ' + source.textContent);
            rowDiv.appendChild(card);
          });
  
          rezultatDiv.appendChild(rowDiv);
          rezultatDiv.scrollIntoView({ behavior: 'smooth' });
        })
        .catch(err => {
          console.error('Error fetching data:', err);
          rezultatDiv.innerHTML = '<p>Failed to fetch results. Please try again later.</p>';
        });
    }
  }
  