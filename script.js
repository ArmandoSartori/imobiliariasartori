const properties = [
    {
        id: 1,
        title: "Casa Moderna com Piscina",
        type: "casa",
        city: "sao-paulo",
        cityName: "São Paulo",
        price: 850000,
        bedrooms: 4,
        bathrooms: 3,
        area: 250,
        icon: "🏠"
    },
    {
        id: 2,
        title: "Apartamento Luxuoso Centro",
        type: "apartamento",
        city: "campinas",
        cityName: "Campinas",
        price: 450000,
        bedrooms: 3,
        bathrooms: 2,
        area: 120,
        icon: "🏢"
    },
    {
        id: 3,
        title: "Terreno Amplo Condomínio",
        type: "terreno",
        city: "sorocaba",
        cityName: "Sorocaba",
        price: 280000,
        bedrooms: 0,
        bathrooms: 0,
        area: 500,
        icon: "🏞️"
    },
    {
        id: 4,
        title: "Casa de Praia Vista Mar",
        type: "casa",
        city: "santos",
        cityName: "Santos",
        price: 1200000,
        bedrooms: 5,
        bathrooms: 4,
        area: 320,
        icon: "🏖️"
    },
    {
        id: 5,
        title: "Apartamento Cobertura Duplex",
        type: "apartamento",
        city: "sao-paulo",
        cityName: "São Paulo",
        price: 1800000,
        bedrooms: 4,
        bathrooms: 3,
        area: 280,
        icon: "🌆"
    },
    {
        id: 6,
        title: "Sala Comercial Centro",
        type: "comercial",
        city: "ribeirao-preto",
        cityName: "Ribeirão Preto",
        price: 320000,
        bedrooms: 0,
        bathrooms: 2,
        area: 85,
        icon: "🏪"
    },
    {
        id: 7,
        title: "Casa Condomínio Fechado",
        type: "casa",
        city: "campinas",
        cityName: "Campinas",
        price: 680000,
        bedrooms: 3,
        bathrooms: 3,
        area: 200,
        icon: "🏡"
    },
    {
        id: 8,
        title: "Apartamento Studio Mobiliado",
        type: "apartamento",
        city: "santos",
        cityName: "Santos",
        price: 250000,
        bedrooms: 1,
        bathrooms: 1,
        area: 45,
        icon: "🏠"
    },
    {
        id: 9,
        title: "Terreno Esquina Comercial",
        type: "terreno",
        city: "sao-paulo",
        cityName: "São Paulo",
        price: 950000,
        bedrooms: 0,
        bathrooms: 0,
        area: 800,
        icon: "🏗️"
    },
    {
        id: 10,
        title: "Casa Colonial Centro Histórico",
        type: "casa",
        city: "sorocaba",
        cityName: "Sorocaba",
        price: 520000,
        bedrooms: 3,
        bathrooms: 2,
        area: 180,
        icon: "🏛️"
    },
    {
        id: 11,
        title: "Apartamento Alto Padrão",
        type: "apartamento",
        city: "ribeirao-preto",
        cityName: "Ribeirão Preto",
        price: 750000,
        bedrooms: 4,
        bathrooms: 3,
        area: 180,
        icon: "🌃"
    },
    {
        id: 12,
        title: "Loja Térrea Avenida Principal",
        type: "comercial",
        city: "campinas",
        cityName: "Campinas",
        price: 480000,
        bedrooms: 0,
        bathrooms: 2,
        area: 150,
        icon: "🏬"
    }
];

let filteredProperties = [...properties];

function formatPrice(price) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 0
    }).format(price);
}

function createPropertyCard(property) {
    const card = document.createElement('div');
    card.className = 'property-card';
    
    let featuresHTML = '';
    if (property.type !== 'terreno' && property.type !== 'comercial') {
        featuresHTML = `
            <div class="property-features">
                <div class="feature">🛏️ ${property.bedrooms} quartos</div>
                <div class="feature">🚿 ${property.bathrooms} banheiros</div>
            </div>
        `;
    } else if (property.type === 'comercial') {
        featuresHTML = `
            <div class="property-features">
                <div class="feature">🚿 ${property.bathrooms} banheiros</div>
                <div class="feature">📐 ${property.area}m²</div>
            </div>
        `;
    } else {
        featuresHTML = `
            <div class="property-features">
                <div class="feature">📐 ${property.area}m²</div>
            </div>
        `;
    }
    
    card.innerHTML = `
        <div class="property-image">
            <span style="font-size: 5rem; position: relative; z-index: 1;">${property.icon}</span>
            <div class="property-badge">${property.type.charAt(0).toUpperCase() + property.type.slice(1)}</div>
        </div>
        <div class="property-content">
            <h3 class="property-title">${property.title}</h3>
            <div class="property-location">📍 ${property.cityName}, SP</div>
            ${featuresHTML}
            <div class="property-price">${formatPrice(property.price)}</div>
            <button class="property-cta" onclick="contactProperty(${property.id})">Ver Detalhes</button>
        </div>
    `;
    
    return card;
}

function renderProperties(propertiesToRender) {
    const grid = document.getElementById('properties-grid');
    const noResults = document.getElementById('no-results');
    const countElement = document.getElementById('properties-count');
    
    grid.innerHTML = '';
    
    if (propertiesToRender.length === 0) {
        noResults.style.display = 'block';
        grid.style.display = 'none';
        countElement.textContent = '';
    } else {
        noResults.style.display = 'none';
        grid.style.display = 'grid';
        countElement.textContent = `${propertiesToRender.length} ${propertiesToRender.length === 1 ? 'imóvel encontrado' : 'imóveis encontrados'}`;
        
        propertiesToRender.forEach(property => {
            grid.appendChild(createPropertyCard(property));
        });
    }
}

function filterProperties() {
    const cityFilter = document.getElementById('city-filter').value;
    const typeFilter = document.getElementById('type-filter').value;
    const priceFilter = document.getElementById('price-filter').value;
    
    filteredProperties = properties.filter(property => {
        const cityMatch = cityFilter === 'all' || property.city === cityFilter;
        const typeMatch = typeFilter === 'all' || property.type === typeFilter;
        const priceMatch = priceFilter === 'all' || property.price <= parseInt(priceFilter);
        
        return cityMatch && typeMatch && priceMatch;
    });
    
    renderProperties(filteredProperties);
    
    window.scrollTo({
        top: document.getElementById('properties-grid').offsetTop - 100,
        behavior: 'smooth'
    });
}

function resetFilters() {
    document.getElementById('city-filter').value = 'all';
    document.getElementById('type-filter').value = 'all';
    document.getElementById('price-filter').value = 'all';
    filterProperties();
}

function contactProperty(propertyId) {
    const property = properties.find(p => p.id === propertyId);
    alert(`Obrigado pelo interesse em "${property.title}"!\n\nEm breve nossa equipe entrará em contato.\n\nTelefone: (11) 3456-7890\nEmail: contato@sartori.com.br`);
}

document.getElementById('search-btn').addEventListener('click', filterProperties);

document.getElementById('city-filter').addEventListener('change', filterProperties);
document.getElementById('type-filter').addEventListener('change', filterProperties);
document.getElementById('price-filter').addEventListener('change', filterProperties);

document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Mensagem enviada com sucesso! Nossa equipe entrará em contato em breve.');
    this.reset();
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

renderProperties(filteredProperties);
