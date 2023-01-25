
export class ApiComponent {
  constructor(public service: DataService,) { }

  //Variables globales, la variable audio almacena la url para reproducir el audio,
  //la variable palabra contiene la palabra que hay que pasar a la api y por último
  //la variable sinonimos contiene los sinonimos sacados de la api.
  public audio: string = "";
  public palabra: string = "bitch";
  public sinonimos: string[] = [];

  public onClick() {
    //Accede a la api para obtener la url del audio y guardarla en su variable
    this.service.getResponseJuego(this.palabra).subscribe(response => {
      this.audio = response[0].phonetics[0].audio;
    });
    //Vuelve a acceder a la api y coge el listado de sinónimos y los guarda en su variable
    this.service.getResponseJuego(this.palabra).subscribe(response => {
      this.sinonimos = response[0].meanings[0].synonyms;
    });
    //Crea un objeto audio, le mete el audio con la variable y lo reproduce
    let repr = new Audio(this.audio);
    repr.play();
  }

  //Las variables prueba y cont son de prueba para ver que el método funciona,
  //la variable verdadero si que es de, método.
  public prueba: string = "";
  public cont: number = 0;
  public verdadero: boolean = true;

  //Cunado se inicia la página
  ngOnInit() {
    //Durante 0,1 se ejecutará lo que haya aquí dentro, en este caso he hecho una
    //prueba que cada 0,1 segundos cambia de hola a adios. Cuando verdadero sea falso,
    //se detendrá
    setInterval(() => {
      if (this.verdadero == true) {
        if (this.cont == 0) {
          this.cont = 1;
          this.prueba = "Adios";
        } else {
          this.cont = 0;
          this.prueba = "Hola";
        }
      }
    }, 100)
    //A los tres segundos la variable verdadero sera falso y no entrará en el método.
    setTimeout(() => {
      this.verdadero = false; 
    }, 3000)
  }
}