package com.example.voting.service;

import com.example.voting.dto.PollResponse;
import com.example.voting.dto.OptionResponse;
import com.example.voting.factory.PollFactory;
import com.example.voting.model.Option;
import com.example.voting.model.Poll;
import com.example.voting.repo.OptionRepository;
import com.example.voting.repo.PollRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class PollService {
    private final PollRepository pollRepo;
    private final OptionRepository optionRepo;

    public PollService(PollRepository pollRepo, OptionRepository optionRepo) {
        this.pollRepo = pollRepo;
        this.optionRepo = optionRepo;
    }

    @Transactional
    public PollResponse createPoll(String title, List<String> options) {
        Poll poll = PollFactory.create(title, options);
        Poll saved = pollRepo.save(poll);
        return toResponse(saved);
    }

    @Transactional(readOnly = true)
    public List<PollResponse> listPolls() {
        return pollRepo.findAll().stream().map(this::toResponse).toList();
    }

    @Transactional
    public PollResponse vote(Long optionId) {
        Option opt = optionRepo.findById(optionId)
                .orElseThrow(() -> new IllegalArgumentException("Option not found"));
        opt.setVotes(opt.getVotes() + 1);
        optionRepo.save(opt);
        return toResponse(opt.getPoll());
    }

    private PollResponse toResponse(Poll poll) {
        List<OptionResponse> opts = poll.getOptions().stream()
                .map(o -> new OptionResponse(o.getId(), o.getText(), o.getVotes()))
                .toList();
        return new PollResponse(poll.getId(), poll.getTitle(), opts);
    }
}
