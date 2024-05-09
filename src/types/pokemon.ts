export interface RawData {
    name: string
    id: number
    cryAudio: string
    sprite: string
}

export interface PokemonData {
    abilities: Ability[]
    base_experience: number
    cries: { latest:string, legacy:string }
    forms: Form[]
    game_indices: Index[]
    height: number
    held_items: []
    id: number
    is_default: boolean
    location_area_encounters: string
    moves: Mfe[]
    name: string
    order: number
    past_abilities: []
    past_types: []
    species: Species
    sprites: Sprites
    stats: Stat[]
    types: Type[]
    weight: number
}
  
interface Ability {
    ability: { name:string, url:string }
    is_hidden: boolean
    slot: number
}
  
interface Form {
    name: string
    url: string
}
  
interface Index {
    game_index: number
    version: { name:string, url:string }
}
  
interface Mfe {
    move: { name:string, url:string }
    version_group_details: VersionGroupDetail[]
}
  
interface VersionGroupDetail {
    level_learned_at: number
    move_learn_method: {name: string, url:string}
    version_group: {name: string, url:string}
}
  
interface Species {
    name: string
    url: string
}
  
interface Sprites {
    back_default: string
    back_female: string | null
    back_shiny: string | null
    back_shiny_female: string | null
    front_default: string
    front_female: string | null
    front_shiny: string | null
    front_shiny_female: string | null
    other: Other
    versions: Versions
}
  
interface Other {
    dream_world: { front_default:string, front_female: string | null }
    home: Home
    "official-artwork": { front_default:string | null, front_shiny:string | null }
    showdown: Showdown
}
  
interface Home {
    front_default: string
    front_female: string | null
    front_shiny: string
    front_shiny_female: string | null
}
  
interface Showdown {
    back_default: string
    back_female: string | null
    back_shiny: string | null
    back_shiny_female: string | null
    front_default: string
    front_female: string | null
    front_shiny: string | null
    front_shiny_female: string | null
}
  
interface Versions {
    "generation-i": GenerationI
    "generation-ii": GenerationIi
    "generation-iii": GenerationIii
    "generation-iv": GenerationIv
    "generation-v": GenerationV
    "generation-vi": GenerationVi
    "generation-vii": GenerationVii
    "generation-viii": GenerationViii
}
  
interface GenerationI {
    "red-blue": RedBlue
    yellow: Yellow
}
  
interface RedBlue {
    back_default: string | null
    back_gray: string | null
    back_transparent: string | null
    front_default: string | null
    front_gray: string | null
    front_transparent: string | null
}
  
interface Yellow {
    back_default: string | null
    back_gray: string | null
    back_transparent: string | null
    front_default: string | null
    front_gray: string | null
    front_transparent: string | null
}
  
interface GenerationIi {
    crystal: Crystal
    gold: Gold
    silver: Silver
}
  
interface Crystal {
    back_default: string | null
    back_shiny: string | null
    back_shiny_transparent: string | null
    back_transparent: string | null
    front_default: string | null
    front_shiny: string | null
    front_shiny_transparent: string | null
    front_transparent: string | null
}
  
interface Gold {
    back_default: string | null
    back_shiny: string | null
    front_default: string | null
    front_shiny: string | null
    front_transparent: string | null
}
  
interface Silver {
    back_default: string | null
    back_shiny: string | null
    front_default: string | null
    front_shiny: string | null
    front_transparent: string | null
}
  
interface GenerationIii {
    emerald: Emerald
    "firered-leafgreen": FireredLeafgreen
    "ruby-sapphire": RubySapphire
}
  
interface Emerald {
    front_default: string | null
    front_shiny: string | null
}
  
interface FireredLeafgreen {
    back_default: string | null
    back_shiny: string | null
    front_default: string | null
    front_shiny: string | null
}
  
interface RubySapphire {
    back_default: string
    back_shiny: string
    front_default: string
    front_shiny: string
}
  
interface GenerationIv {
    "diamond-pearl": DiamondPearl
    "heartgold-soulsilver": HeartgoldSoulsilver
    platinum: Platinum
}
  
interface DiamondPearl {
    back_default: string | null
    back_female: string | null
    back_shiny: string | null
    back_shiny_female: string | null
    front_default: string | null
    front_female: string | null
    front_shiny: string | null
    front_shiny_female: string | null
}
  
interface HeartgoldSoulsilver {
    back_default: string | null
    back_female: string | null
    back_shiny: string | null
    back_shiny_female: string | null
    front_default: string | null
    front_female: string | null
    front_shiny: string | null
    front_shiny_female: string | null
}
  
interface Platinum {
    back_default: string | null
    back_female: string | null
    back_shiny: string | null
    back_shiny_female: string | null
    front_default: string | null
    front_female: string | null
    front_shiny: string | null
    front_shiny_female: string | null
}
  
interface GenerationV {
    "black-white": BlackWhite
}
  
interface BlackWhite {
    animated: Animated
    back_default: string | null
    back_female: string | null
    back_shiny: string | null
    back_shiny_female: string | null
    front_default: string | null
    front_female: string | null
    front_shiny: string | null
    front_shiny_female: string | null
  }
  
interface Animated {
    back_default: string | null
    back_female: string | null
    back_shiny: string | null
    back_shiny_female: string | null
    front_default: string | null
    front_female: string | null
    front_shiny: string | null
    front_shiny_female: string | null
}
  
interface GenerationVi {
    "omegaruby-alphasapphire": OmegarubyAlphasapphire
    "x-y": XY
}
  
interface OmegarubyAlphasapphire {
    front_default: string | null
    front_female: string | null
    front_shiny: string | null
    front_shiny_female: string | null
}
  
interface XY {
    front_default: string | null
    front_female: string | null
    front_shiny: string | null
    front_shiny_female: string | null
}
  
interface GenerationVii {
    icons: Icons
    "ultra-sun-ultra-moon": UltraSunUltraMoon
}
  
interface Icons {
    front_default: string | null
    front_female: string | null
}
  
interface UltraSunUltraMoon {
    front_default: string | null
    front_female: string | null
    front_shiny: string | null
    front_shiny_female: string | null
}
  
interface GenerationViii {
    icons: Icons2
}
  
interface Icons2 {
    front_default: string | null
    front_female: string | null
}
  
interface Stat {
    base_stat: number
    effort: number
    stat: Stat2
}
  
interface Stat2 {
    name: string
    url: string
}
  
interface Type {
    slot: number
    type: Type2
}
  
interface Type2 {
    name: string
    url: string
}
