class TestClass {
    constructor(a, b) {
        this.a = a
        this.b = b
    }
}

let array = []
let el = document.getElementById("test")
el.onclick = () => {
    sessionStorage.removeItem("newItem")
    array.unshift(new TestClass(1,2))
    sessionStorage.setItem("newItem", JSON.stringify(array))
    array.pop()
    array = JSON.parse(sessionStorage.getItem("newItem"))
    array.unshift(new TestClass(3,4))
    sessionStorage.setItem("newItem", JSON.stringify(array))
    array.pop()
    array.pop()
}