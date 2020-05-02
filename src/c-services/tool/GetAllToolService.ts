import { IGetAllToolService } from "./interfaces/IToolService"
import IToolRepository from "../../e-infra/data/repositories/tool/interfaces/IToolRepository"

import Operation from '../Operation'

import { toEntity } from './ToolMapper'

class GetAllToolService extends Operation implements IGetAllToolService {

    private readonly toolRepository: IToolRepository

    constructor(toolRepository: IToolRepository) {
        super(['SUCCESS', 'ERROR', 'ERROR_MONGOOSE'])

        this.toolRepository = toolRepository
    }

    getEventType() {
        return this.getEventTypes()
    }

    execute(tag: string = '') {

        const { SUCCESS, ERROR, ERROR_MONGOOSE } = this.getEventType()

        try {

            let cond = {}
            if (tag !== '')
                cond = { tags: tag }

            // LIKE - Example
            //{ tags: { $regex: new RegExp(tag), $options: 'i' }}

            this.toolRepository.getAll(cond, (error, tools) => {
                if (error) {
                    this.emit(ERROR_MONGOOSE, error)
                }
                else {

                    const resTools = tools.map(tool => {
                        const { id, title, link, description, tags, created_at, updated_at } = toEntity(tool)
                        return { id, title, link, description, tags, created_at, updated_at }
                    })

                    this.emit(SUCCESS, resTools)
                }
            })

        } catch (error) {
            this.emit(ERROR, error)
        }
    }
}

export default GetAllToolService