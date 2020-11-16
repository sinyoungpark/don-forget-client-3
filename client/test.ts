
class Person{
    private name: string;

    constructor(name:string){
        this.name = name;
    }

    sayHello(){
        return this.name;
    }
}

const person = new Person("Lee");
console.log(person.sayHello());