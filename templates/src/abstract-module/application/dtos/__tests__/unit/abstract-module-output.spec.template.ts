import { {{ModuleName}}Entity } from '@/{{ModuleNameMin}}/domain/entities/{{ModuleNameMin}}.entity';
import { {{ModuleNameMin}}DataBuilder } from '@/{{ModuleNameMin}}/domain/testing/helpers/{{ModuleNameMin}}-data-builder';
import { {{ModuleName}}OutputMapper } from '../../{{ModuleNameMin}}-output';

describe('{{ModuleName}}OutputMapper unit tests', () => {
  it('should convert a {{ModuleNameMin}} in output', () => {
    const entity = new {{ModuleName}}Entity({{ModuleNameMin}}DataBuilder({}));
    const spyToJson = jest.spyOn(entity, 'toJSON');
    const sut = {{ModuleName}}OutputMapper.toOutput(entity);

    expect(spyToJson).toHaveBeenCalled();
    expect(sut).toStrictEqual(entity.toJSON());
  });
});
