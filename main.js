let data = {};

fetch('texas.json')
  .then(response => response.json())
  .then(jsonData => {
    jsonData.data.forEach(item => {
      data[item.id] = {
        coords: [parseFloat(item.lat), parseFloat(item.lon)],
        title: item.title,
        name: item.title,
        address: item.address,
        phone: item.phone,
        email: item.email
      };
    });

    const map = L.map('map').setView([10.542, 106.864], 8);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(map);

    const customsIcon = L.icon({
        iconUrl: './icon.png',
        iconSize: [70, 70],
    });

    for (let key in data) {
      const texas = data[key];

      L.marker(texas.coords, { title: texas.title, icon: customsIcon })
        .bindPopup(`
          <div class="info">
              <div class="img">
                  <img src="https://texaschickenvn.com/vnt_upload/dealer/thumbs/180_crop_logo_nha_hang_texas.jpg" alt="" style="width: 100%">
              </div>
              <div class="name">
                  <div class="name-title">
                      <span>${texas.name}</span>
                  </div>
                  <div class="name-content">
                      <span>${texas.address}</span>
                      <span><ion-icon name="call-outline"></ion-icon>&nbsp; ${texas.phone}</span>
                      <span><ion-icon name="mail-open-outline"></ion-icon>&nbsp; ${texas.email}</span>
                  </div>
              </div>
          </div>
        `)
        .addTo(map);
    }  
  })
  .catch(error => {
    console.error('Error file JSON:', error);
  });
