export default function setBodyColor({backgroundImage}) {
    var getClass = document.getElementsByClassName('modal-content')
    document.documentElement.style.setProperty('background-image', backgroundImage)
    var f = document.documentElement.style.setProperty('background-image', backgroundImage)
    getClass.map((w) => console.log(w))

}