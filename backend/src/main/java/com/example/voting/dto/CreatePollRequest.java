package com.example.voting.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.util.List;

public record CreatePollRequest(
        @NotBlank String title,
        @Size(min = 1) List<@NotBlank String> options
) { }
