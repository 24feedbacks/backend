import { postgresConnection } from "../database/postgres";
import { EntityTarget, ObjectLiteral, Repository, Not } from "typeorm";
import { Response } from "../types/http";
import { IService } from "../types/IService";
import IHasher from "../types/IHasher";
import User from "../entities/User";
import { userLoginDTO } from "../types/login";
import Goal from "entities/Goal";
import Improvements from "entities/Improvements";
import Team from "entities/Team";

export default class UserService implements IService {
  repository: Repository<User>;
  entity: Object;
  hasher: IHasher;

  constructor(entitiy: EntityTarget<User>, hasher: IHasher) {
    this.repository = postgresConnection.getRepository(entitiy);
    this.entity = entitiy;
    this.hasher = hasher;
  }

  create = async (user: User, response: Response) => {
    try {
      const { password } = user;
      let userToCreate = {
        ...user,
        password: await this.hasher.hash(password),
      };

      const userCreated = await this.repository.save(userToCreate);
      return response.status(201).send(userCreated);
    } catch (err) {
      console.log(err);
      return response.status(500).send(err);
    }
  };

  update = async (company: any, response: Response) => {
    try {
      const update = await this.repository.update(company.id, company);

      if (update.affected) {
        return response.status(201).send({
          message: `Company ${company.id} updated successfully!`,
        });
      } else {
        return response.status(204).send({
          message: `Company ${company.id} not updated!`,
        });
      }
    } catch (err) {
      console.log(err);
      return response.status(500).send(err);
    }
  };

  delete = async (id: string, response: Response) => {
    try {
      const deleted = await this.repository.delete(id);

      if (deleted.affected) {
        return response.status(204).send({
          message: `user ${id} deleted successfully!`,
        });
      } else {
        return response.status(404).send({ message: "Company not deleted!" });
      }
    } catch (err) {
      console.log(err);
      return response.status(500).send(err);
    }
  };

  list = async (response: Response) => {
    try {
      const users = await this.repository.find();

      if (users.length == 0) {
        return response.status(204).send({ message: "No users found!" });
      }

      users.forEach((user) => {
        delete (<any>user)["password"];
      });

      return response.send(users);
    } catch (err) {
      throw err;
    }
  };

  read = async (id: any, response: Response) => {
    try {
      const user = await this.repository.findOne({
        where: { id },
        relations: ["category"],
      });
      delete (<any>user)["password"];
      return response.send(user);
    } catch (err) {
      console.log(err);
      return response.status(500).send(err);
    }
  };

  login = async (user: userLoginDTO, response: Response) => {
    try {
      const { email, password } = user;
      const userFound = await this.repository.findOne({
        where: { email },
        relations: ["category", "team"],
        loadEagerRelations: true,
      });

      if (!userFound) {
        return response.status(404).send({ message: "User not found!" });
      }

      const isAuthenticate = await this.hasher.compare(
        password,
        userFound.password
      );

      if (!isAuthenticate) {
        return response.status(401).send({ message: "Unauthorized!" });
      }

      delete (<any>userFound)["password"];

      return response.status(200).send(userFound);
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  getFreeManangers = async (response: Response) => {
    try {
      const manangers = await this.repository.find({
        where: { category: { name: "mananger" } },
        relations: ["category", "team"],
      });

      if (manangers.length == 0) {
        return response
          .status(204)
          .send({ message: "No free managers found!" });
      }

      return response.send(manangers);
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  listWithCategories = async (response: Response) => {
    try {
      const users = await this.repository.find({
        relations: ["category"],
      });

      return response.send(users);
    } catch (err) {
      console.log(err);
      return null;
    }
  };
}
