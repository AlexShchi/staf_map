console.log(data);
(()=>{
    const map = document.querySelector('.js-staf-map');
    
    ymaps.ready(init);

    function init(){
        var myMap = new ymaps.Map("map", {
            center: [55.76, 37.64],
            zoom: 4
        });

        addPlacemarks(myMap, data);
        

    }
})()

function addPlacemarks(map,data){

    createLayouts();

    data.forEach((item,index)=>{
        var myPlacemark = new ymaps.Placemark(item.coords, {
            balloonContentHeader: item.name,
            balloonContentBody: item.position,
            balloonContentFooter: item.workHours,
            hintContent: item.coords
        },
        {balloonContentLayout: 'my#simplestBCLayout'});
        map.geoObjects.add(myPlacemark);
        // Балун откроется в точке «привязки» балуна — т. е. над меткой.
        // myPlacemark.balloon.open();
    })
}

function createLayouts() {
    var MyBalloonContentLayoutClass = ymaps.templateLayoutFactory.createClass(
        '<div class="staf-map__baloon">'+
        '<h3>{{ properties.name }}</h3>' +
        '<p>Описание: {{ properties.description }}</p>' +
        '<p>Население: {{ properties.population|default:"неизвестно" }}</p>' +
        '<p>Метрополитен: {% if properties.metro %}да{% else %}нет{% endif %}</p>'+
        '</div>'
    );
    ymaps.layout.storage.add('my#simplestBCLayout', MyBalloonContentLayoutClass);
}

function getUsers(){
    const response = '/api/v1/user/{userId}/info';
    return response;
}
function normalizeData(data){
    return data.map(()=>{return;})
}