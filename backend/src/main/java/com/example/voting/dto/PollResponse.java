package com.example.voting.dto;

import java.util.List;

public record PollResponse(Long id, String title, List<OptionResponse> options) { }
public record OptionResponse(Long id, String text, Integer votes) { }
