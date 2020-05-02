import IToken from "./IToken"

interface IJwt {
    signin(payload: IToken): string
    verify(token: string): string | Object
}

export default IJwt