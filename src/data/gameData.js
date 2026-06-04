// src/data/gameData.js
import cardBlue1 from '../assets/cards/card_blue1.svg'
import cardBlue2 from '../assets/cards/card_blue2.svg'
import cardBlue3 from '../assets/cards/card_blue3.svg'
import cardBlue4 from '../assets/cards/card_blue4.svg'

import regionSkane          from '../assets/images/region/Skåne.jpg'
import regionVastragotaland from '../assets/images/region/Västra_Götaland.jpg'
import regionStockholm      from '../assets/images/region/Stockholm.jpg'
import regionNorrbotten     from '../assets/images/region/Norrbotten.jpg'

import cityMalmo      from '../assets/images/city/malmo.svg'
import cityGothenburg from '../assets/images/city/gothenburg.svg'
import cityStockholm  from '../assets/images/city/stockholm.svg'
import cityLulea      from '../assets/images/city/lulea.svg'

import animalWhiteCrane from '../assets/images/animal/White Crane.jpg'
import animalSeal       from '../assets/images/animal/Seal.jpg'
import animalRadjur     from '../assets/images/animal/Rådjur.jpg'
import animalMoose      from '../assets/images/animal/Moose.jpg'

import sigSkane       from '../assets/images/signature/skanebryggan.jpg'
import sigGoteborg    from '../assets/images/signature/goteborg.jpg'
import sigStockholm   from '../assets/images/signature/stockholm.jpg'
import sigNorrsken    from '../assets/images/signature/norrsken.jpg'

const gameData = [
  // ── REGION CARDS ──
  {
    id: 1,
    name: "Skåne",
    image: regionSkane,
    region: "skane",
    type: "region",
    isFlipped: false,
    isMatched: false,
  },
  {
    id: 2,
    name: "Västra Götaland",
    image: regionVastragotaland,
    region: "vastragotaland",
    type: "region",
    isFlipped: false,
    isMatched: false,
  },
  {
    id: 3,
    name: "Stockholm",
    image: regionStockholm,
    region: "stockholm",
    type: "region",
    isFlipped: false,
    isMatched: false,
  },
  {
    id: 4,
    name: "Norrbotten",
    image: regionNorrbotten,
    region: "norrbotten",
    type: "region",
    isFlipped: false,
    isMatched: false,
  },

  // ── CITY CARDS ──
  {
    id: 5,
    name: "malmö",
    image: cityMalmo,
    region: "skane",
    type: "city",
    isFlipped: false,
    isMatched: false,
  },
  {
    id: 6,
    name: "Gothenburg",
    image: cityGothenburg,
    region: "vastragotaland",
    type: "city",
    isFlipped: false,
    isMatched: false,
  },
  {
    id: 7,
    name: "Stockholm",
    image: cityStockholm,
    region: "stockholm",
    type: "city",
    isFlipped: false,
    isMatched: false,
  },
  {
    id: 8,
    name: "luleå",
    image: cityLulea,
    region: "norrbotten",
    type: "city",
    isFlipped: false,
    isMatched: false,
  },

  // ── ANIMAL CARDS ──
  {
    id: 9,
    name: "White Crane",
    image: animalWhiteCrane,
    region: "skane",
    type: "animal",
    isFlipped: false,
    isMatched: false,
  },
  {
    id: 10,
    name: "Seal",
    image: animalSeal,
    region: "vastragotaland",
    type: "animal",
    isFlipped: false,
    isMatched: false,
  },
  {
    id: 11,
    name: "Rådjur",
    image: animalRadjur,
    region: "stockholm",
    type: "animal",
    isFlipped: false,
    isMatched: false,
  },
  {
    id: 12,
    name: "Moose",
    image: animalMoose,
    region: "norrbotten",
    type: "animal",
    isFlipped: false,
    isMatched: false,
  },

    // ── SIGNATURE CARDS ──
     {
    id: 13,
    name: "oresund bridge",
    image: sigSkane,
    region: "skane",
    type: "signature",
    isFlipped: false,
    isMatched: false,
  },
  {
    id: 14,
    name: "tram",
    image: sigGoteborg,
    region: "vastragotaland",
    type: "signature",
    isFlipped: false,
    isMatched: false,
  },
  {
    id: 15,
    name: "nobel prize",
    image: sigStockholm,
    region: "stockholm",
    type: "signature",
    isFlipped: false,
    isMatched: false,
  },
  {
    id: 16,
    name: "aurora",
    image: sigNorrsken,
    region: "norrbotten",
    type: "signature",
    isFlipped: false,
    isMatched: false,
  },
]

export const cardBackImages = {
  region: cardBlue1,
  city: cardBlue2,
  animal: cardBlue3,
  signature: cardBlue4,
}

export default gameData