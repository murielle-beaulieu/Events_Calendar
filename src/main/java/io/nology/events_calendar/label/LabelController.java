package io.nology.events_calendar.label;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/labels")
public class LabelController {

    private LabelService labelService;

    public LabelController(LabelService labelService) {
        this.labelService = labelService;
    }

    @GetMapping()
    public ResponseEntity<List<Label>> getAllLabels() {
        List<Label> allLabels = this.labelService.getAllLabels();
        return new ResponseEntity<>(allLabels, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Label> getLabelById(@PathVariable Long id) {
        Label label = this.labelService.getLabelById(id);
        return new ResponseEntity<>(label, HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<Label> createLabel(@RequestBody CreateLabelDTO data){
        Label newLabel = this.labelService.createLabel(data);
        return new ResponseEntity<>(newLabel, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Label> updateLabel(@PathVariable Long id, @RequestBody UpdateLabelDTO data) {
        Label updatedLabel = this.labelService.updateLabel(id, data);
        return new ResponseEntity<>(updatedLabel, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public String deleteLabel(@PathVariable Long id) {
        this.labelService.deleteLabel(id);
        return ("Successfully deleted Label # " + id);
    }  

    
}
