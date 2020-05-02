import { IDeleteToolService } from "./interfaces/IToolService"
import IToolRepository from "../../e-infra/data/repositories/tool/interfaces/IToolRepository"

import Operation from '../Operation'

class DeleteToolService extends Operation implements IDeleteToolService {

    private readonly toolRepository: IToolRepository

    constructor(toolRepository: IToolRepository) {
        super(['SUCCESS', 'ERROR', 'ERROR_MONGOOSE', 'NOT_FOUND'])

        this.toolRepository = toolRepository
    }

    getEventType() {
        return this.getEventTypes()
    }

    execute(id: string) {

        const { SUCCESS, ERROR, ERROR_MONGOOSE, NOT_FOUND } = this.getEventType()

        try {

            this.toolRepository.getById(id, (error, tool) => {
                if (error) {
                    this.emit(ERROR_MONGOOSE, error)
                }
                else {
                    if (tool === null) {
                        this.emit(NOT_FOUND, null)
                    }
                    else {

                        tool.remove((error, removedTool) => {
                            if (error) {
                                this.emit(ERROR_MONGOOSE, error)
                            } else {
                                this.emit(SUCCESS, null)
                            }
                        })

                    }
                }
            })

        } catch (error) {
            this.emit(ERROR, error)
        }
    }
}

export default DeleteToolService