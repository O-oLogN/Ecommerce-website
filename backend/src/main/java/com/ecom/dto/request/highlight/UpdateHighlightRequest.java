package com.ecom.dto.request.highlight;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class UpdateHighlightRequest {
    private String highlightId;
    private String content;
}
