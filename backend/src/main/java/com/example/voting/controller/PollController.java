package com.example.voting.controller;

import com.example.voting.dto.CreatePollRequest;
import com.example.voting.dto.PollResponse;
import com.example.voting.service.PollService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/polls")
public class PollController {
    private final PollService service;

    public PollController(PollService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<PollResponse> create(@Valid @RequestBody CreatePollRequest req) {
        return ResponseEntity.ok(service.createPoll(req.title(), req.options()));
    }

    @GetMapping
    public ResponseEntity<List<PollResponse>> list() {
        return ResponseEntity.ok(service.listPolls());
    }

    @PostMapping("/{optionId}/vote")
    public ResponseEntity<PollResponse> vote(@PathVariable Long optionId) {
        return ResponseEntity.ok(service.vote(optionId));
    }

    @DeleteMapping("/{pollId}")
    public ResponseEntity<Void> delete(@PathVariable Long pollId) {
        service.deletePoll(pollId);
        return ResponseEntity.noContent().build();
    }
}

