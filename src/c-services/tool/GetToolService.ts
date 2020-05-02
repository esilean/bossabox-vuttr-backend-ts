import { IGetToolService } from "./interfaces/IToolService"
import IToolRepository from "../../e-infra/data/repositories/tool/interfaces/IToolRepository"

import Operation from '../Operation'

import { toEntity } from './ToolMapper'

class GetToolService extends Operation implements IGetToolService {

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
                        const { id, title, link, description, tags, created_at, updated_at } = toEntity(tool)

                        this.emit(SUCCESS, { id, title, link, description, tags, created_at, updated_at })
                    }
                }
            })

        } catch (error) {
            this.emit(ERROR, error)
        }
    }
}

export default GetToolService