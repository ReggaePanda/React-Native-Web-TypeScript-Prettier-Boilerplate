import { Ctx, Query, Resolver } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

// Models
import User from '../entity/User';

// Typescript
import { IMyContext } from '../types/MyContext';

@Resolver(() => User)
export default class UserResolver {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  @Query(() => [User])
  public async users() {
    console.log('Query users');
    return this.userRepository.find();
  }

  @Query(() => User, { nullable: true })
  public async me(
    @Ctx()
    ctx: IMyContext,
  ) {
    console.log('Query me');
    const { userId } = ctx.req.session!;

    return userId ? User.findOne(userId) : null;
  }
}
