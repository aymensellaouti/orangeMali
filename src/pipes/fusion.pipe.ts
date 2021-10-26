import {
  ArgumentMetadata,
  BadRequestException, HttpException, HttpStatus,
  Injectable,
  PipeTransform
} from "@nestjs/common";

@Injectable()
export class FusionPipe implements PipeTransform {
  transform(data: { skills: string[] }, metadata: ArgumentMetadata) {
    if (!data.skills) {
      throw new BadRequestException('Veuillez saisir des données correctes');
    }
    // 1 == "1" "1" !== 1
    if (metadata.type === 'body') {
      return data.skills.map((mot) => mot.toUpperCase()).join('-');
    }
    return data;
  }
}
