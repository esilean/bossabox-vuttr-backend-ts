import container from './infra/crossCutting/ioc/container'
import IApp from './app/interfaces/IApp'

const app = container.resolve<IApp>('app')

app.start()