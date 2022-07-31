export type User = {
    email: string,
    token: string,
    isAuthenticated: boolean
};

//POLL
export type Poll = {
    id:string,
    errors:{},
    content:string,
    opened:boolean,
    questions: Question[]
}

//QUESTIONS
export type Question ={
    id: string,
    content: string, 
    questionOrder: number,
    type: QuestionType,
    answers: Answer[]
}

//QUESTION TYPE
export type QuestionType = "RADIO" | "CHECKBOX" | "SELECT" | "CADENA"

//ANSWERS
export type Answer={
    id: string,
    content:string
}

//TIPOS DE RUTA
export type RouteType =  "PRIVATE" | "PUBLIC" | "GUEST";

//Estructuración de cada una de las rutas de la aplicación
//cada ruta va a tener un path, un componente para renderizar y un tipo de ruta(privada, publica, guest)
export type Route = {
    path: string,
    component: any,
    routeType: RouteType
}
//type para saber que tipo de respuesta estamos enviando  
export type UserAnswer = {
    questionId : number
    answer: string | number  //puede ser una sola respuesta o varias
    type: QuestionType
}

//tipado para mandar la respuesta al backend
export type PollReplyDetail = {
    questionId : number
    answerId: string | number  //puede ser una sola respuesta o varias
    answerContent: string
}


//tipado para mandar el formulario al backend
export type PollReply = {
    pollReplies: PollReplyDetail[]
    user:string,
    poll: number
}