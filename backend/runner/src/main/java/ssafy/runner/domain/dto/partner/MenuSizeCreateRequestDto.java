package ssafy.runner.domain.dto.partner;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter @ToString
@NoArgsConstructor @AllArgsConstructor
public class MenuSizeCreateRequestDto {
    private Long sizeId;
    private int price;
}
