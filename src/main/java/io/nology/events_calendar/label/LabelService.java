package io.nology.events_calendar.label;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
public class LabelService {

    private LabelRepository labelRepo;
    private ModelMapper mapper;

    public LabelService(LabelRepository labelRepo, ModelMapper mapper) {
        this.labelRepo = labelRepo;
        this.mapper = mapper;
    }

    public List<Label> getAllLabels() {
        return this.labelRepo.findAll();
    }

    public Label getLabelById(Long id) {
        Optional<Label> result = this.labelRepo.findById(id);
        if (result.isEmpty()) {
            return null;
        }
        Label found = result.get();
        return found;
    }

    public Label createLabel(CreateLabelDTO data) {
        Label newLabel = mapper.map(data, Label.class);
        return this.labelRepo.save(newLabel);
    }

    public Label updateLabel(Long id, UpdateLabelDTO data) {
        Optional<Label> result = this.labelRepo.findById(id);
        if(result.isEmpty()){
         return null;
        }

        Label found = result.get();
        mapper.map(data,found);

        return this.labelRepo.save(found);
    }

    public void deleteLabel(Long id) {
        Optional<Label> result = this.labelRepo.findById(id);
        Label found = result.get();
        found.setDeleted(true);
    }

}
