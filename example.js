const map = L.map('map', { zoomControl: false, attributionControl: false }).setView([51.505, -0.09], 20);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([51.505, -0.09]).addTo(map)
    .bindPopup('Center')
    .openPopup();

const ExampleButton = L.FlexControl.extend({
    onAdd (map) {
        const btn = L.DomUtil.create('div', 'example-button')
        btn.textContent = '+'
        return btn
    },
    onRemove (map) {
        // Nothing to do here
    }
})

const positions = ['topright', 'topleft', 'bottomright', 'bottomleft']
const grows = ['x', 'y']

const buttons = []

for (let pos of positions) {
    for (let grow of grows) {
        for (let i = 0; i < 3; i++) {
            const button = new ExampleButton({ position: { corner: pos, grow: grow } })
            buttons.push(button)
            button.addTo(map) 
        }
    }
}
