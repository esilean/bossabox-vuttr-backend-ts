import ToolEntity from '../../d-domain/entities/Tool'
import { IToolModel } from '../../e-infra/data/database/models/interfaces/tool.interface'
import ToolModel from '../../e-infra/data/database/models/ToolModel'

export function toEntity(tool: IToolModel) {

    const { id, title, link, description, tags, created_at, updated_at } = tool

    const entity: ToolEntity = new ToolEntity(
        id,
        title,
        link,
        description,
        tags
    )

    entity.created_at = created_at
    entity.updated_at = updated_at

    return entity
}

export function toSave(entity: ToolEntity) {

    const { title, link, description, tags } = entity

    const tool: IToolModel = new ToolModel({
        title,
        link,
        description,
        tags,
    })

    return tool
}
