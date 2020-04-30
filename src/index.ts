import container from './e-infra/crossCutting/ioc/container'
import IApp from './a-app/interfaces/IApp'

const app = container.resolve<IApp>('app')

app.start()