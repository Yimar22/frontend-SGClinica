//acciones para las poll
export type PollActions = 
    {type: 'pollcontent', content : string} //acción para setear el contenido a la poll
    | {type: 'questioncontent', payload:{index:number, content: string}} //acción para setear el contenido a la pregunta con el indice de la pregunta
    | {type:'answercontent', payload:{index:number, answerIndex: number, content:string}}
    | {type:'changequestiontype', payload:{index:number, value:string}}
    | {type:'newquestion', index:number} //acción para agregar una nueva pregunta
    | {type:'newanswer', index:number} //agregar una nueva answer a una pregunta, el índice es de la pregunta
    | {type:'removequestion', questionId:string}
    | {type:'removeanswer', payload:{index:number, answerId:string}} //indice de la pregunta e indice de la answer
    | {type:'orderquestions', payload: {source:number, destination:number}}
    | {type:'seterrors', errors:{}}
    | {type:'resetformpoll'};
