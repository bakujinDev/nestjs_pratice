import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDTO } from './create_movie.dto';

export class UpdateMovieDTO extends PartialType(CreateMovieDTO) {}
