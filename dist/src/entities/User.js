"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Category_1 = __importDefault(require("./Category"));
const Goal_1 = __importDefault(require("./Goal"));
const Team_1 = __importDefault(require("./Team"));
let User = class User {
    id;
    name;
    email;
    password;
    created_at;
    updated_at;
    team;
    goals;
    category;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Team_1.default, (team) => team.colaborators),
    __metadata("design:type", Team_1.default)
], User.prototype, "team", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Goal_1.default, (goal) => goal.user),
    __metadata("design:type", Array)
], User.prototype, "goals", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Category_1.default, (category) => category.users),
    __metadata("design:type", Category_1.default)
], User.prototype, "category", void 0);
User = __decorate([
    (0, typeorm_1.Entity)()
], User);
exports.default = User;
