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
const Company_1 = __importDefault(require("./Company"));
const Team_1 = __importDefault(require("./Team"));
let Sector = class Sector {
    id;
    name;
    created_at;
    updated_at;
    company;
    teams;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Sector.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Sector.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Sector.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Sector.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Company_1.default, (company) => company.sectors),
    __metadata("design:type", Company_1.default)
], Sector.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Team_1.default, team => team.sector),
    __metadata("design:type", Array)
], Sector.prototype, "teams", void 0);
Sector = __decorate([
    (0, typeorm_1.Entity)()
], Sector);
exports.default = Sector;
