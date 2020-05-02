import { ICreateToolService } from "./interfaces/IToolService"
import IToolRepository from '../../e-infra/data/repositories/tool/ToolRepository'

import Operation from '../Operation'

import { toSave, toEntity } from './ToolMapper'
import ToolEntity from "../../d-domain/entities/Tool"

import { validate } from 'class-validator'
import { getErrors } from '../ErrorValidation'

class CreateToolService extends Operation implements ICreateToolService {

    private readonly toolRepository: IToolRepository

    constructor(toolRepository: IToolRepository) {
        super(['SUCCESS', 'ERROR', 'ERROR_MONGOOSE', 'VALIDATION_ERROR'])

        this.toolRepository = toolRepository
    }

    getEventType() {
        return this.getEventTypes()
    }

    execute(body: ToolEntity) {

        const { SUCCESS, ERROR, ERROR_MONGOOSE, VALIDATION_ERROR } = this.getEventType()

        try {

            const { title, link, description, tags } = body
            const newTool = new ToolEntity('', title, link, description, tags)

            validate(newTool, { validationError: { target: false } }).then(errors => {
                if (errors.length > 0) {
                    this.emit(VALIDATION_ERROR, getErrors(errors))
                } else {

                    this.toolRepository.save(toSave(newTool), (error, tool) => {
                        if (error) {
                            this.emit(ERROR_MONGOOSE, error)
                        }
                        else {

                            const { id, title, link, description, tags, created_at, updated_at } = toEntity(tool)

                            this.emit(SUCCESS, { id, title, link, description, tags, created_at, updated_at })
                        }
                    })
                }
            })

        } catch (error) {
            this.emit(ERROR, error)
        }
    }
}

export default CreateToolService