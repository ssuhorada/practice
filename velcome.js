
class TestClass {
    constructor(a, b) {
        this.a = a
        this.b = b
    }
}

let array = []
let el = document.getElementById("test")
el.onclick = () => {
    array.push(new TestClass(1,2))
    sessionStorage.setItem("newItem", JSON.stringify(array))
    array.pop()
    array.push(JSON.parse(sessionStorage.getItem("newTimer")))
    array.push(new TestClass(3,4))
    sessionStorage.setItem("newItem", JSON.stringify(array))
}