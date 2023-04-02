export default class HeroService {
  heroes = [];

  constructor(messageService) {
    this.messageService = messageService;

    this.initialize();
  }

  initialize() {
    this.heroes = [
      { id: 11, name: 'Mr. Nice' },
      { id: 12, name: 'Narco' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' }
    ]
  }

  async getHeroes() {
    this.log('fetched heroes');
    return await this.heroes;
  }

  async getHero(id) {
    this.log(`fetched hero id=${id}`);
    return await this.heroes.find((hero) => hero.id == id);
  }

  async addHero(hero) {
    hero.id = this.generateId();
    this.log(`added hero w/ id=${hero.id}`);
    this.heroes.push(hero);
    return await hero;
  }

  async updateHero(hero) {
    this.log(`updated hero id=${hero.id}`);
    const target = this.heroes.find(h => h.id === hero.id);
    target.name = hero.name;
    return await target;
  }

  async deleteHero(hero) {
    this.log(`deleted hero id=${hero.id}`);
    return await this.heroes.splice(this.heroes.findIndex(h => h.id === hero.id), 1);
  }

  async searchHeroes(name) {
    this.log(`found heroes matching "${name}"`);
    if (name) {
      return await this.heroes.filter(hero => hero.name.toLowerCase().indexOf(name.toLowerCase()) !== -1);
    } else {
      return Promise.resolve([]);
    }
  }

  log(message) {
    this.messageService.add(`HeroService: ${message}`);
  }

  generateId() {
    const ids = this.heroes.map(hero => hero.id);
    const maxId = Math.max.apply(null, ids);
    return ++maxId;
  }
}
