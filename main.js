// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

//Factory Function
const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum : specimenNum,
    dna: dna,

    // Mutate the first base. If the mutation is the same run again.
    mutate(){
        let oldDna = this.dna[0]
        let newDna = returnRandBase();
        console.log(`Old: ${oldDna} New: ${newDna}`)
        if(oldDna === newDna){
          console.log(`Same DNA rerunning`);
          this.mutate();
        }
        else {
          this.dna[0] = newDna;
        }
      },
      //compare current dna with input dna. Return percentage in common
    compareDNA(secondDNA){
      let count = 0;
      for(let i = 0;i<this.dna.length;i++){
        if(this.dna[i] == secondDNA.dna[i]){
          count++;
        }
      }
      let percentage = Math.floor((count / this.dna.length) * 100);
      return `Specimen #1 and Specimen #2 have ${percentage}% in common.`
    }, 
    // if the dna contains atleast 60% G or C return true
    willLikelySurvive(){
      let count = 0;
      for(let i = 0; i<this.dna.length;i++){
        if(this.dna[i] == 'C' || this.dna[i] == 'G'){
          count++;
        }
      }
      let percentage = Math.floor((count / this.dna.length) * 100);
      return percentage >= 60;
    },
    complementStrand(){
      let returnArr = [];
      for(let i = 0; i<this.dna.length;i++){
        switch(this.dna[i]){
          case 'T':
            this.dna[i] = 'A';
            break;
          case 'A':
            this.dna[i] = 'T';
          case 'C':
            this.dna[i] = 'G';
            break;
          case 'G':
            this.dna[i] = 'C';
        }
        returnArr.push(this.dna[i]);
      }
      
      return returnArr;
    }
  }
};


let test = mockUpStrand();
let newOrg = pAequorFactory(1,test);
let org2 = pAequorFactory(2,mockUpStrand());
newOrg.mutate();
console.log(newOrg.compareDNA(org2));
console.log(newOrg.willLikelySurvive());

console.log(newOrg.complementStrand());



