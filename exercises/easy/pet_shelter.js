class Owner {
  constructor(name) {
    this.name = name;
    this.pets = 0;
  }

  numberOfPets() {
    return this.pets;
  }

  incrementNumberOfPets() {
    this.pets += 1;
  }
}

class Pet {
  constructor(type, name) {
    this.type = type;
    this.name = name;
  }

  description() {
    return `a ${this.type} named ${this.name}`;
  }
}

class Shelter {
  constructor() {
    this.adoptions = {};
    this.unadoptedPets = [];
  }

  adopt(owner, pet) {
    if (owner.name in this.adoptions) {
      this.adoptions[owner.name].push(pet);
    } else {
      this.adoptions[owner.name] = [pet];
    }
    owner.incrementNumberOfPets();
  }

  addPet(pet) {
    this.unadoptedPets.push(pet);
  }

  printAdoptions() {
    for (let ownerName in this.adoptions) {
      console.log(`${ownerName} has adopted the following pets:`);
      let pets = this.adoptions[ownerName];
      pets.forEach(pet => {
        console.log(pet.description());
      });
      console.log();
    }
  }

  printUnadoptedPets() {
    console.log('The Animal Shelter has the following unadopted pets:');
    this.unadoptedPets.forEach(pet => {
      console.log(pet.description());
    });
    console.log();
  }

  numberOfUnadoptedPets() {
    return this.unadoptedPets.length;
  }
}

let shelter = new Shelter();
let asta = new Pet('dog', 'Asta');
let laddie = new Pet('dog', 'Laddie');
let fluffy = new Pet('cat', 'Fluffy');
let kat = new Pet('cat', 'Kat');
let ben = new Pet('cat', 'Ben');
let chatterbox = new Pet('parakeet', 'Chatterbox');
let bluebell = new Pet('parakeet', 'Bluebell');
shelter.addPet(asta);
shelter.addPet(laddie);
shelter.addPet(fluffy);
shelter.addPet(kat);
shelter.addPet(ben);
shelter.addPet(chatterbox);
shelter.addPet(bluebell);
shelter.printUnadoptedPets();

let butterscotch = new Pet('cat', 'Butterscotch');
let pudding      = new Pet('cat', 'Pudding');
let darwin       = new Pet('bearded dragon', 'Darwin');
let kennedy      = new Pet('dog', 'Kennedy');
let sweetie      = new Pet('parakeet', 'Sweetie Pie');
let molly        = new Pet('dog', 'Molly');
let chester      = new Pet('fish', 'Chester');

let phanson = new Owner('P Hanson');
let bholmes = new Owner('B Holmes');

shelter.adopt(phanson, butterscotch);
shelter.adopt(phanson, pudding);
shelter.adopt(phanson, darwin);
shelter.adopt(bholmes, kennedy);
shelter.adopt(bholmes, sweetie);
shelter.adopt(bholmes, molly);
shelter.adopt(bholmes, chester);
shelter.printAdoptions();

console.log(`${phanson.name} has ${phanson.numberOfPets()} adopted pets.`);
console.log(`${bholmes.name} has ${bholmes.numberOfPets()} adopted pets.`);
console.log(`The Animal shelter has ${shelter.numberOfUnadoptedPets()} unadopted pets.`);
